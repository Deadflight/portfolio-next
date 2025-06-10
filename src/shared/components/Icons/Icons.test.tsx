import React from "react";
import { render } from "@testing-library/react";
import { SvgIcons } from "./Icons";
import "@testing-library/jest-dom";

describe("SvgIcons", () => {
  const iconNames = [
    "Calendar",
    "MapPin",
    "Location",
    "Users",
    "Server",
    "Database",
    "Cloud",
    "Settings",
    "Phone",
    "Globe",
    "Heart",
    "Coffee",
    "Lightbulb",
    "Trophy",
    "Rocket",
    "BookOpen",
    "Star",
    "ChartLine",
    "PaperPlane",
    "AlertCircle",
  ];

  iconNames.forEach((iconName) => {
    it(`renders ${iconName} icon without crashing`, () => {
      const Icon = SvgIcons[iconName as keyof typeof SvgIcons];
      const { container } = render(<Icon />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  it("renders MapPin and Location with the same SVG", () => {
    const MapPin = SvgIcons.MapPin;
    const Location = SvgIcons.Location;
    const { container: mapPinContainer } = render(<MapPin />);
    const { container: locationContainer } = render(<Location />);
    expect(mapPinContainer.innerHTML).toBe(locationContainer.innerHTML);
  });

  it("renders AlertCircle fallback icon", () => {
    const AlertCircle = SvgIcons.AlertCircle;
    const { container } = render(<AlertCircle />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("circle")).toBeInTheDocument();
  });
});
