import {
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";
import { professionalDocuments } from "../../data/professionalDocuments";

export default function ProfessionalDocuments() {
  return (
    <ProfessionalPage
      title="Documents"
      description="Manage the documents used to verify your professional account."
    >
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#102A54]">
              Verification documents
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep your verification information up to date.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#012663] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91]">
            <Upload className="h-4 w-4" />
            Upload document
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0])
                  alert(`Selected: ${e.target.files[0].name}`);
              }}
            />
          </label>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {professionalDocuments.map((doc) => (
            <article
              key={doc.id}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#1268E8]">
                  <FileText className="h-5 w-5" />
                </span>
                {doc.status === "Verified" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock3 className="h-5 w-5 text-orange-500" />
                )}
              </div>
              <h3 className="mt-4 font-bold text-[#102A54]">{doc.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{doc.type}</p>
              <p
                className={`mt-4 text-sm font-semibold ${doc.status === "Verified" ? "text-green-600" : "text-orange-600"}`}
              >
                {doc.status}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Updated {doc.updatedAt}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex gap-3 rounded-xl bg-[#F3F6FA] p-4 text-sm text-slate-600">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[#1268E8]" />
          <p>
            Only upload valid documents. Document verification is currently
            represented by this frontend demo and does not send files to a
            server.
          </p>
        </div>
      </section>
    </ProfessionalPage>
  );
}
