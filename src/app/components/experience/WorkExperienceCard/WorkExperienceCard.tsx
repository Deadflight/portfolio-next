import { Chip } from "@/shared/components/Chip/Chip";
import { Icon } from "@/shared/components/Icons/Icons";
import { IWorkExperience } from "@/shared/types/workExperience.types";
import React, { FC } from "react";

interface IWorkExperienceCardProps {
  workExperience: IWorkExperience;
  isLast?: boolean;
}

/**
 * WorkExperienceCard component displays detailed information about a single work experience entry,
 * including position, company details, business period, location, professional reference,
 * business impact, and technology stack.
 *
 * @component
 * @param {IWorkExperienceCardProps} props - The props for the WorkExperienceCard component.
 * @param {IWorkExperience} props.workExperience - The work experience data to display.
 * @param {boolean} [props.isLast] - Indicates if this is the last card in the timeline (renders the timeline line accordingly).
 *
 * @returns {JSX.Element} The rendered WorkExperienceCard component.
 */
export const WorkExperienceCard: FC<IWorkExperienceCardProps> = ({
  workExperience,
  isLast = false,
}) => {
  return (
    <article
      className="relative"
      data-testid={`work-experience-card-${workExperience.id}`}
    >
      {/* Timeline line */}
      {isLast && (
        <div className="absolute left-6 top-20 w-0.5 h-full bg-accent hidden md:block" />
      )}

      <div className="card relative">
        {/* Timeline dot */}
        <div className="absolute -left-3 top-6 w-6 h-6 bg-text-main rounded-full border-4 border-white hidden md:block" />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="flex items-center mb-3">
              <h3 className="text-xl font-heading font-semibold text-text-main">
                {workExperience.position}
              </h3>
              {workExperience.businessPeriod.current && (
                <span className="ml-3 px-3 py-1 bg-success text-white text-xs font-body font-bold rounded-full">
                  Actual
                </span>
              )}
            </div>

            <div className="space-y-3 text-sm font-body text-text-main mb-4">
              <div className="flex items-center">
                <Icon
                  name="Building"
                  size={16}
                  className="text-primary-brand mr-2"
                />
                <div>
                  <p className="font-bold">{workExperience.company.name}</p>
                  <p className="text-text-main text-xs">
                    {workExperience.company.industry}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Icon
                  name="Calendar"
                  size={16}
                  className="text-primary-brand mr-2"
                />
                <div>
                  <p>
                    {workExperience.businessPeriod.start} -{" "}
                    {workExperience.businessPeriod.end}
                  </p>
                  <p className="text-text-main text-xs">
                    {workExperience.businessPeriod.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Icon
                  name="MapPin"
                  size={16}
                  className="text-primary-brand mr-2"
                />
                <span>{workExperience.company.location}</span>
              </div>
            </div>

            {workExperience.professionalReference && (
              <div className="bg-white p-3 rounded-lg border border-accent/30">
                <div className="flex items-center mb-2">
                  <Icon
                    name="Users"
                    size={16}
                    className="text-primary-brand mr-2"
                  />
                  <span className="font-body font-bold text-text-main text-sm">
                    Referencia
                  </span>
                </div>
                <p className="text-xs font-body text-text-main">
                  {workExperience.professionalReference.name}
                </p>
                <p className="text-xs font-body text-primary-brand">
                  {workExperience.professionalReference.email}
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <h4 className="font-body font-bold text-text-main mb-3 text-base">
                  Logros y Responsabilidades:
                </h4>
                <ul className="space-y-3">
                  {workExperience.businessImpact.map(
                    (item: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-text-main rounded-full mt-2.5 mr-3 flex-shrink-0" />
                        <span className="font-body text-text-main leading-relaxed">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-body font-bold text-text-main mb-3 text-base">
                  Tecnologías utilizadas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {workExperience.technologyStack.map((tech: string) => (
                    <Chip key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
