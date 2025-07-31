import React from "react";
import { render, screen } from "@testing-library/react";
import { WorkExperienceList } from "./WorkExperienceList";
import { IWorkExperience } from "@/shared/types/workExperience.types";
import "@testing-library/jest-dom";
import { workExperienceMockData } from "@/shared/mocks/workExperience";

// Mock WorkExperienceCard
jest.mock("../WorkExperienceCard/WorkExperienceCard", () => ({
  WorkExperienceCard: ({
    workExperience,
  }: {
    workExperience: IWorkExperience;
  }) => <div data-testid="work-experience-card">{workExperience.position}</div>,
}));

const mockExperiences = workExperienceMockData;

describe("WorkExperienceList", () => {
  it("renders a ul with className 'space-y-8'", () => {
    const { container } = render(
      <WorkExperienceList workExperiences={mockExperiences} />
    );
    const ul = container.querySelector("ul.space-y-8");
    expect(ul).toBeInTheDocument();
  });

  it("renders the correct number of WorkExperienceCard components", () => {
    render(<WorkExperienceList workExperiences={mockExperiences} />);
    const cards = screen.getAllByTestId("work-experience-card");
    expect(cards).toHaveLength(mockExperiences.length);
  });

  it("renders nothing if workExperiences is empty", () => {
    render(<WorkExperienceList workExperiences={[]} />);
    expect(screen.queryByTestId("work-experience-card")).toBeNull();
  });
});
