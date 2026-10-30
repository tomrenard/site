import { roles, education } from "@/content/resume";
import { Section } from "@/components/section";

export function ResumeTimeline() {
  return (
    <>
      {roles.map((role) => (
        <Section
          key={role.company}
          aside={
            <>
              <p>
                {role.start} to {role.end}
              </p>
              <p className="text-sm leading-6 font-normal tracking-normal text-mute">
                {role.location}
              </p>
            </>
          }
        >
          <h2 className="mb-1 text-2xl leading-7 font-medium tracking-[-0.03em] text-balance">
            {role.company}, {role.title}
          </h2>
          {role.tech?.length ? (
            <p className="mb-4 text-sm leading-6 text-mute">
              {role.tech.join(" • ")}
            </p>
          ) : null}
          {role.blurb && <p>{role.blurb}</p>}
          {role.bullets?.length ? (
            <ul className="mt-4 list-disc list-outside pl-4 marker:text-mute lg:pl-0">
              {role.bullets.map((b) => (
                <li key={b.text} className="mt-2 first:mt-0">
                  {b.label && <strong className="font-medium">{b.label}: </strong>}
                  {b.text}
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ))}
      <Section title="Education">
        {education.map((e) => (
          <p key={e.what} className="mt-2 first:mt-0">
            {e.what}, {e.where} ({e.year})
          </p>
        ))}
      </Section>
    </>
  );
}
