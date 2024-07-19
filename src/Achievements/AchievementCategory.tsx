import React from "react";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";

import { Achievement } from "./Achievements";

interface IProps {
  title: string;
  achievements: {achievement: Achievement}[];
  allAchievements?: {achievement: Achievement}[];
  sx?: boolean;
}

function steamCount(achievements: {achievement: Achievement}[]): number {
  return achievements.filter((entry) => !entry.achievement.NotInSteam).length;
}

export function AchievementCategory({ title, achievements, allAchievements, sx, children }: React.PropsWithChildren<IProps>): JSX.Element {
  // Most parts of the four categories in the old code were very similar (besides the content of
  // AccordianDetails), with the Acquired category having a few differences,
  // although both the Acquired and Locked categories also had an extra prop in the AccordianDetails.
  return (
    <Accordion defaultExpanded={!!allAchievements} disableGutters square>
      <AccordionSummary>
        {allAchievements ? (
          <Typography variant="h5" sx={{ my: 1 }}>
            {title} ({achievements.length}/{allAchievements.length}, {steamCount(achievements)}/{steamCount(allAchievements)} for Steam)
          </Typography>
        ) : (
          <Typography variant="h5" color="secondary">
            {title} ({achievements.length} remaining, {steamCount(achievements)} for Steam)
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails sx={sx ? {pt: 2} : undefined}>
        { children }
      </AccordionDetails>
    </Accordion>
  );
}