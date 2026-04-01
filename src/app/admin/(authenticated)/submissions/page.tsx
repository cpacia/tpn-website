"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, MapPin, Check, X, ChevronDown } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    const res = await fetch(`/api/admin/submissions?status=${filter}`);
    const data = await res.json();
    setSubmissions(data);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchSubmissions();
    if (status === "APPROVED") {
      setShowCreateForm(id);
    }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-2">
        Incoming Submissions
      </h1>
      <p className="text-warm-gray mb-8">
        Review assistance requests submitted by the public.
      </p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === s
                ? "bg-navy text-white"
                : "bg-white text-navy/70 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-warm-gray">Loading...</p>
      ) : submissions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <p className="text-warm-gray">No submissions found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === sub.id ? null : sub.id)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[sub.status]
                    }`}
                  >
                    {sub.status}
                  </span>
                  <div>
                    <div className="font-medium text-navy">{sub.name}</div>
                    <div className="text-sm text-warm-gray">
                      {sub.email} &middot;{" "}
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-warm-gray transition-transform ${
                    expandedId === sub.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === sub.id && (
                <div className="border-t border-gray-100 p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-warm-gray">
                      <Mail size={14} />
                      <a
                        href={`mailto:${sub.email}`}
                        className="hover:text-navy"
                      >
                        {sub.email}
                      </a>
                    </div>
                    {sub.phone && (
                      <div className="flex items-center gap-2 text-warm-gray">
                        <Phone size={14} />
                        {sub.phone}
                      </div>
                    )}
                    {sub.address && (
                      <div className="flex items-center gap-2 text-warm-gray">
                        <MapPin size={14} />
                        {sub.address}
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-navy mb-1">
                      Message
                    </p>
                    <p className="text-warm-gray text-sm whitespace-pre-wrap">
                      {sub.message}
                    </p>
                  </div>

                  {sub.status === "PENDING" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(sub.id, "APPROVED")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <Check size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(sub.id, "REJECTED")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <X size={16} />
                        Reject
                      </button>
                    </div>
                  )}

                  {showCreateForm === sub.id && (
                    <CreatePublicRequestForm
                      onDone={() => setShowCreateForm(null)}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CreatePublicRequestForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    let imageUrl: string | null = null;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }
    }

    await fetch("/api/admin/public-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        requestedAmount: parseFloat(requestedAmount),
        date: date || null,
        imageUrl,
      }),
    });

    setSaving(false);
    onDone();
  }

  return (
    <div className="bg-gold/5 border border-gold/20 rounded-lg p-5 mt-4">
      <h4 className="font-semibold text-navy mb-4">
        Create Public Request Entry
      </h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Requested Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={requestedAmount}
              onChange={(e) => setRequestedAmount(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Date (optional)
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Image (optional)
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-warm-gray file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-navy/10 file:text-navy hover:file:bg-navy/20 file:cursor-pointer cursor-pointer"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gold hover:bg-gold-light text-navy text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Public Request"}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-navy text-sm font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
