"use client";
import { Icon } from "@/shared/components/Icons/Icons";
import { useLocale, useTranslations } from "next-intl";
import { sendEvent, GA_EVENTS } from "@/lib/ga/events";

/**
 * Renders a download link for the user's CV, allowing visitors to download the complete
 * professional resume as a PDF. The link adapts to the user's locale, providing either the
 * Spanish or English version of the CV based on the detected language. The link is styled
 * as a secondary button and includes an icon for visual emphasis.
 * @component
 * @example
 * <DownloadLink />
 * @returns {JSX.Element} The rendered download link component.
*/
export const DownloadLink = () => {
    const t = useTranslations("experience");
    const locale = useLocale() || "en";
    const cvFile = locale?.toString().startsWith("es")
        ? "/CV-Carlos-Correa-ES.pdf"
        : "/CV-Carlos-Correa-EN.pdf";

    const handleClick = () => {
        sendEvent(GA_EVENTS.DOWNLOAD_CV);
    };

    return (
        <a
            href={cvFile}
            download
            className="btn-secondary inline-flex items-center"
            aria-label={t("downloadCv")}
            onClick={handleClick}
        >
            <Icon name="Download" size={16} className="mr-2" />
            {t("downloadCv")}
        </a>
    )
}