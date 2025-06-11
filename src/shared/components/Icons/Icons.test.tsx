import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SvgIcons, Icon } from "./Icons";

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
      const IconComponent = SvgIcons[iconName as keyof typeof SvgIcons];
      const { container } = render(<IconComponent />);
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

  // Tests for Icon component
  describe("Icon component", () => {
    it("renders the correct icon by name", () => {
      render(<Icon name="Calendar" />);
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
    });

    it("applies the correct size and className", () => {
      const { container } = render(
        <Icon name="Calendar" size={32} className="custom-class" />
      );
      const span = container.querySelector("span");
      expect(span).toHaveStyle({ width: "32px", height: "32px" });
      expect(span).toHaveClass("custom-class");
    });

    it("renders fallback icon and logs warning for unknown icon", () => {
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      render(<Icon name={"NonExistentIcon" as keyof typeof SvgIcons} />);
      expect(warnSpy).toHaveBeenCalledWith(
        'Icon "NonExistentIcon" not found. Using fallback icon.'
      );
      // Fallback icon contains a <circle> element
      expect(
        screen.getByRole("img", { hidden: true }).querySelector("circle")
      ).toBeInTheDocument();
      warnSpy.mockRestore();
    });
  });
});
