"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Donation {
  id: string;
  description: string;
  amount: number | null;
  category: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
}

const CATEGORIES = [
  "Supporting Childhood",
  "Family Support",
  "Domestic Violence",
  "Childhood Hunger",
  "Flood Relief",
  "Community Support",
  "PTSD",
  "Suicide Awareness",
  "Sexual Assault",
  "Autism Awareness",
  "Other",
];

export default function TransparencyAdminPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [tab, setTab] = useState<"donations" | "expenses">("donations");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [donRes, expRes] = await Promise.all([
      fetch("/api/admin/transparency-donations"),
      fetch("/api/admin/transparency-expenses"),
    ]);
    setDonations(await donRes.json());
    setExpenses(await expRes.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p className="text-warm-gray">Loading...</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-2">
        Transparency Data
      </h1>
      <p className="text-warm-gray mb-8">
        Manage donation records and operating expenses displayed on the
        Transparency page.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("donations")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "donations"
              ? "bg-navy text-white"
              : "bg-white text-navy/70 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Donations ({donations.length})
        </button>
        <button
          onClick={() => setTab("expenses")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "expenses"
              ? "bg-navy text-white"
              : "bg-white text-navy/70 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Operating Expenses ({expenses.length})
        </button>
      </div>

      {tab === "donations" ? (
        <DonationsTab donations={donations} onRefresh={fetchData} />
      ) : (
        <ExpensesTab expenses={expenses} onRefresh={fetchData} />
      )}
    </div>
  );
}

function DonationsTab({
  donations,
  onRefresh,
}: {
  donations: Donation[];
  onRefresh: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this donation record?")) return;
    await fetch("/api/admin/transparency-donations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onRefresh();
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Donation
        </button>
      </div>

      {showNew && (
        <DonationForm
          onSave={() => {
            setShowNew(false);
            onRefresh();
          }}
          onCancel={() => setShowNew(false)}
        />
      )}

      <div className="space-y-3">
        {donations.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
          >
            {editingId === d.id ? (
              <DonationForm
                initial={d}
                onSave={() => {
                  setEditingId(null);
                  onRefresh();
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-navy font-medium">{d.description}</p>
                  <span className="inline-block mt-1 text-xs font-medium px-3 py-1 rounded-full bg-gold/10 text-gold-dark">
                    {d.category}
                  </span>
                </div>
                {d.amount != null && (
                  <div className="text-lg font-bold text-navy font-serif shrink-0">
                    ${d.amount.toLocaleString()}
                  </div>
                )}
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setEditingId(d.id)}
                    className="p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DonationForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Donation;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [description, setDescription] = useState(initial?.description || "");
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0]);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...(initial ? { id: initial.id } : {}),
      description,
      amount: amount || null,
      category,
    };

    await fetch("/api/admin/transparency-donations", {
      method: initial ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    onSave();
  }

  return (
    <div className="bg-gray-50 rounded-lg p-5 mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-navy">
          {initial ? "Edit Donation" : "New Donation"}
        </h4>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Amount ($) — leave blank if N/A
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gold hover:bg-gold-light text-navy text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : initial ? "Update" : "Add"}
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

function ExpensesTab({
  expenses,
  onRefresh,
}: {
  expenses: Expense[];
  onRefresh: () => void;
}) {
  const [showNew, setShowNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this expense record?")) return;
    await fetch("/api/admin/transparency-expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onRefresh();
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      {showNew && (
        <ExpenseForm
          onSave={() => {
            setShowNew(false);
            onRefresh();
          }}
          onCancel={() => setShowNew(false)}
        />
      )}

      <div className="space-y-3">
        {expenses.map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
          >
            {editingId === e.id ? (
              <ExpenseForm
                initial={e}
                onSave={() => {
                  setEditingId(null);
                  onRefresh();
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-navy font-medium flex-1">{e.description}</p>
                <div className="text-lg font-bold text-navy font-serif shrink-0">
                  ${e.amount.toLocaleString()}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setEditingId(e.id)}
                    className="p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {expenses.length > 0 && (
          <div className="bg-navy rounded-xl p-5 flex items-center gap-4 text-white">
            <p className="font-medium flex-1">Total Operating Expenses</p>
            <div className="text-lg font-bold font-serif">
              ${total.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExpenseForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Expense;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [description, setDescription] = useState(initial?.description || "");
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...(initial ? { id: initial.id } : {}),
      description,
      amount,
    };

    await fetch("/api/admin/transparency-expenses", {
      method: initial ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    onSave();
  }

  return (
    <div className="bg-gray-50 rounded-lg p-5 mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-navy">
          {initial ? "Edit Expense" : "New Expense"}
        </h4>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold max-w-xs"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gold hover:bg-gold-light text-navy text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : initial ? "Update" : "Add"}
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
