import { Fragment } from "react";

import { roles, education } from "@/content/resume";

export function ResumeTimeline() {
  return (
    <>
      {roles.map((role, i) => (
        <Fragment key={role.company}>
          {i > 0 && <hr className="my-10 border-rule/20" />}
          <section>
          <h2 className="mt-10 mb-1 text-2xl font-medium tracking-[-0.03em] text-balance first:mt-0">
            {role.company}, {role.title}
          </h2>
          <p className="mt-1 mb-3 text-sm text-mute">
            {role.location}, {role.start} to {role.end}
            {role.tech?.length ? ` · ${role.tech.join(" • ")}` : ""}
          </p>
          {role.blurb && <p className="mt-2">{role.blurb}</p>}
          {role.bullets?.length ? (
            <ul className="mt-3 list-disc list-outside marker:text-mute pl-5">
              {role.bullets.map((b) => (
                <li key={b.text} className="pl-1.5">
                  {b.label && (
                    <strong className="font-medium">{b.label}: </strong>
                  )}
                  {b.text}
                </li>
              ))}
            </ul>
          ) : null}
          </section>
        </Fragment>
      ))}
      <h2 className="mt-16 mb-4 pt-4 border-t border-rule text-lg font-medium">
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
