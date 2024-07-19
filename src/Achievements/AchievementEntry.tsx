import React from "react";

import { Box, Tooltip, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";

import { Achievement } from "./Achievements";
import { Settings } from "../Settings/Settings";
import { AchievementIcon } from "./AchievementIcon";

interface IProps {
  achievement: Achievement;
  unlockedOn?: number;
  cssFiltersUnlocked: string;
  cssFiltersLocked: string;
}

export function AchievementEntry({
  achievement,
  unlockedOn,
  cssFiltersUnlocked,
  cssFiltersLocked,
}: IProps): JSX.Element {
  if (!achievement) return <></>;
  const isUnlocked = !!unlockedOn;

  const mainColor = isUnlocked ? Settings.theme.primary : Settings.theme.secondarylight;
  const captionColor = isUnlocked ? Settings.theme.primarydark : Settings.theme.secondary;
  const iconColor = isUnlocked ? Settings.theme.primary : Settings.theme.primarydark;

  let achievedOn = "";
  if (unlockedOn) {
    achievedOn = new Date(unlockedOn).toLocaleString();
  }

  return (
    <Box
      sx={{
        border: `1px solid ${Settings.theme.well}`,
        mb: 2,
      }}
    >
      <Box /* This outer nowrap box is used to position the link icons in the top right */
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <AchievementIcon
            achievement={achievement}
            unlocked={isUnlocked}
            size="72px"
            colorFilters={isUnlocked ? cssFiltersUnlocked : cssFiltersLocked}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 1,
            }}
          >
            <Typography variant="h6" sx={{ color: mainColor }}>
              {achievement.Name}
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: "500px", color: mainColor }}>
              {achievement.Description}
            </Typography>
            {isUnlocked && (
              <Typography variant="caption" sx={{ fontSize: "12px", color: captionColor }}>
                Acquired on {achievedOn}
              </Typography>
            )}
            {achievement.NotInSteam && (
              <Box /* This box is used to vertically center the taller LinkOffIcon with the Typography */
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <LinkOffIcon sx={{ fontSize: "20px", color: mainColor, marginRight: 1 }} />
                <Typography variant="caption" sx={{ fontSize: "12px", color: captionColor }}>
                  No equivalent Steam achievement
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Tooltip
          title={
            <Typography variant="caption" sx={{ fontSize: "12px", color: Settings.theme.primary }}>
              {achievement.NotInSteam ? "No equivalent Steam achievement" : "Has a Steam achievement"}
            </Typography>
          }
        >
          <Box marginLeft={"auto"} marginBottom={"auto"} marginTop={0.5} marginRight={0.5}>
            {achievement.NotInSteam ? (
              <LinkOffIcon sx={{ fontSize: "20px", color: iconColor }} />
            ) : (
              <LinkIcon sx={{ fontSize: "20px", color: iconColor }} />
            )}
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
