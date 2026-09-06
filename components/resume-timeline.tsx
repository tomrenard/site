import { Fragment } from "react";

import { roles, education } from "@/content/resume";

export function ResumeTimeline() {
  return (
    <>
      {roles.map((role, i) => (
        <Fragment key={role.company}>
          {i > 0 && <hr className="my-8 w-16 border-neutral-200" />}
          <section>
          <h2 className="font-semibold mt-6 mb-2 text-neutral-900 text-balance first:mt-0">
            {role.company}, {role.title}
          </h2>
          <p className="mt-1 mb-3 text-sm text-neutral-500 tracking-wide">
            {role.location}, {role.start} to {role.end}
            {role.tech?.length ? ` · ${role.tech.join(" • ")}` : ""}
          </p>
          {role.blurb && <p className="mt-2">{role.blurb}</p>}
          {role.bullets?.length ? (
          <ul className="mt-3 list-disc list-outside marker:text-neutral-400 pl-5">
            {role.bullets.map((b) => (
              <li key={b.text} className="pl-1.5">
                {b.label && (
                  <strong className="font-semibold">{b.label}: </strong>
                )}
                {b.text}
              </li>
            ))}
          </ul>
          ) : null}
          </section>
        </Fragment>
      ))}
      <h2 className="font-semibold mt-8 mb-4 text-neutral-900 text-balance">
        Education
      </h2>
      <p className="mt-2">
        {education.map((e, i) => (
          <span key={e.what}>
            {i > 0 && " "}
            {e.what} at {e.where} ({e.year}).
          </span>
        ))}
      </p>
    </>
  );
}
