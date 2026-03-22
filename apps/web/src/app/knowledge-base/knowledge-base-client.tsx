"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { BookOpen, FileText, Globe, Upload } from "lucide-react";

const sources = [
  { icon: Globe, label: "Webpages", count: 0, description: "Crawled website pages" },
  { icon: FileText, label: "Documents", count: 0, description: "Uploaded PDFs, docs, and text files" },
  { icon: Upload, label: "Uploads", count: 0, description: "Custom data imports" },
];

export default function KnowledgeBaseClient() {
  return (
    <DashboardLayout>
      <div className="p-6 sm:p-8 max-w-content-wide mx-auto">
        <PageHeader
          title="Knowledge Base"
          description="Manage sources that inform your agents' responses."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {sources.map((source) => (
            <div
              key={source.label}
              className="bg-surface-panel rounded-2xl p-5 shadow-surface-xs border border-border-soft/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-canvas flex items-center justify-center">
                  <source.icon className="w-4 h-4 text-text-subtle" />
                </div>
                <div>
                  <div className="font-body text-[0.82rem] font-medium text-text-strong">{source.label}</div>
                  <div className="font-body text-[0.7rem] text-text-subtle">{source.count} sources</div>
                </div>
              </div>
              <p className="font-body text-[0.75rem] text-text-subtle leading-relaxed">{source.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface-panel rounded-2xl p-8 shadow-surface-xs border border-border-soft/30 text-center">
          <BookOpen className="w-8 h-8 text-text-subtle/40 mx-auto mb-3" />
          <h3 className="font-display text-[0.92rem] font-semibold text-text-strong mb-1">No sources yet</h3>
          <p className="font-body text-[0.78rem] text-text-subtle max-w-sm mx-auto">
            Add webpages, documents, or custom data to build context that flows into your agents automatically.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
