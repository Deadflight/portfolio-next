import { screen } from "@testing-library/react";
import { DownloadLink } from "./DownloadLink";
import { renderWithI18n } from "@/test/utils";

describe("DownloadLink", () => {
    it("renders the CV download card with correct text and link", () => {
        renderWithI18n(<DownloadLink />);
        const linkElement = screen.getByRole("link", { name: /Descargar CV/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/CV-Carlos-Correa-ES.pdf");
        expect(linkElement).toHaveAttribute("download");
    });
});