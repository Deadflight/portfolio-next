import { render, screen } from "@testing-library/react";
import { DownloadLink } from "./DownloadLink";

describe("DownloadLink", () => {
    it("renders the CV download card with correct text and link", () => {
        render(<DownloadLink />);
        const linkElement = screen.getByRole("link", { name: /Descargar CV/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/CV-Carlos-Correa-ES.pdf");
        expect(linkElement).toHaveAttribute("download");
    });
});