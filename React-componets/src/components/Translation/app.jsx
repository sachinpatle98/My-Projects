import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "mr", label: "मराठी" },
];

const TranslationApp = () => {
    const { t, i18n } = useTranslation();
    const [activeLang, setActiveLang] = useState(i18n.language || "en");

    const changeLanguage = (event) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
        setActiveLang(selectedLang);
    };

    const selectStyle = useMemo(() => ({
        fontSize: "14px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid gray",
        backgroundColor: "#f4f4f4",
        cursor: "pointer",
        outline: "none",
    }), []);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <select value={activeLang} onChange={changeLanguage} style={selectStyle}>
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <h1>{t("welcome")}</h1>
                <p>{t("description")}</p>
                <p>{t("greeting")}</p>
            </div>
        </>
    );
};

export default TranslationApp;
