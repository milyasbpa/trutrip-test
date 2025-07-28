import staticData from "@/features/public/login/data/static.json";
import { BannerWrapperLogin } from "../../components/banner_wrapper";
import { BannerImageLogin } from "../../components/banner_image";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const BannerLogin = () => {
  const banner = staticData.banner;
  const bannerImage = banner.image;
  const { t } = useTranslation();
  return (
    <BannerWrapperLogin>
      <BannerImageLogin
        src={bannerImage.src}
        alt={bannerImage.alt}
        width={bannerImage.width}
        height={bannerImage.height}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          placeContent: "center",
          placeItems: "center",
          gap: "0.5rem",
        }}
      >
        <Typography
          sx={{ color: "#151E15", fontWeight: 500, fontSize: "1.75rem" }}
        >
          {t(banner.title)}
        </Typography>
        <Typography
          sx={{ color: "#85888B", fontWeight: 500, fontSize: "1rem" }}
        >
          {t(banner.description)}
        </Typography>
      </Box>
    </BannerWrapperLogin>
  );
};
