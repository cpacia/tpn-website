"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, CheckCircle, X } from "lucide-react";

interface PublicRequest {
  id: string;
  title: string;
  description: string;
  requestedAmount: number;
  fundedAmount: number;
  fullyFunded: boolean;
  date: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export default function RequestsManagerPage() {
  const [requests, setRequests] = useState<PublicRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const fetchRequests = useCallback(async () => {
    const res = await fetch("/api/admin/public-requests");
    const data = await res.json();
    setRequests(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this request?")) return;
    await fetch(`/api/admin/public-requests/${id}`, { method: "DELETE" });
    fetchRequests();
  }

  async function toggleFullyFunded(req: PublicRequest) {
    await fetch(`/api/admin/public-requests/${req.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullyFunded: !req.fullyFunded }),
    });
    fetchRequests();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">
            Public Requests
          </h1>
          <p className="text-warm-gray">
            Manage requests displayed on the public page.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Request
        </button>
      </div>

      {showNew && (
        <RequestForm
          onSave={() => {
            setShowNew(false);
            fetchRequests();
          }}
          onCancel={() => setShowNew(false)}
        />
      )}

      {loading ? (
        <p className="text-warm-gray">Loading...</p>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <p className="text-warm-gray">No public requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              {editingId === req.id ? (
                <RequestForm
                  initial={req}
                  onSave={() => {
                    setEditingId(null);
                    fetchRequests();
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {req.imageUrl && (
                    <img
                      src={req.imageUrl}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-navy truncate">
                        {req.title}
                      </h3>
                      {req.fullyFunded && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap">
                          Fully Funded
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-warm-gray line-clamp-2 mb-2">
                      {req.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-navy font-medium">
                        ${req.fundedAmount.toLocaleString()} / $
                        {req.requestedAmount.toLocaleString()}
                      </span>
                      {req.date && (
                        <span className="text-warm-gray">
                          {new Date(req.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 w-full max-w-xs bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          req.fullyFunded ? "bg-green-500" : "bg-gold"
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            (req.fundedAmount / req.requestedAmount) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleFullyFunded(req)}
                      title={
                        req.fullyFunded
                          ? "Mark as not funded"
                          : "Mark as fully funded"
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        req.fullyFunded
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => setEditingId(req.id)}
                      className="p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RequestForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: PublicRequest;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [requestedAmount, setRequestedAmount] = useState(
    initial?.requestedAmount?.toString() || ""
  );
  const [fundedAmount, setFundedAmount] = useState(
    initial?.fundedAmount?.toString() || "0"
  );
  const [fullyFunded, setFullyFunded] = useState(
    initial?.fullyFunded || false
  );
  const [date, setDate] = useState(
    initial?.date ? initial.date.split("T")[0] : ""
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    let imageUrl = initial?.imageUrl || null;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        imageUrl = data.url;
      }
    }

    const body = {
      title,
      description,
      requestedAmount: parseFloat(requestedAmount),
      fundedAmount: parseFloat(fundedAmount),
      fullyFunded,
      date: date || null,
      imageUrl,
    };

    if (initial) {
      await fetch(`/api/admin/public-requests/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/admin/public-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setSaving(false);
    onSave();
  }

  return (
    <div className="bg-gray-50 rounded-lg p-5 mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-navy">
          {initial ? "Edit Request" : "New Public Request"}
        </h4>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Requested ($)
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
              Funded ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={fundedAmount}
              onChange={(e) => setFundedAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
              <input
                type="checkbox"
                checked={fullyFunded}
                onChange={(e) => setFullyFunded(e.target.checked)}
                className="rounded"
              />
              Fully Funded
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Image {initial?.imageUrl ? "(replace)" : "(optional)"}
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
            {saving ? "Saving..." : initial ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-navy text-sm font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
