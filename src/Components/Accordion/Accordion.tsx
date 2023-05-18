import { Accordion as MuiAccordion, AccordionActions, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";

type AccordionProps = {
  header: string
  details?: string
  detailContent?: React.ReactNode | React.ReactNode[]
  accordionType?: 'top' | 'bottom' | 'single'
}

export function Accordion(props: AccordionProps) {
  const { header, details, detailContent, accordionType = 'single' } = props
  return(
    <MuiAccordion
      disableGutters={true}
      elevation={3}
      style={{
        borderTopLeftRadius: accordionType === ('top' ?? 'single') ? '20px' : undefined,
        borderTopRightRadius: accordionType === ('top' ?? 'single') ? '20px' : undefined,
        borderBottomLeftRadius: accordionType === ('bottom' ?? 'single') ? '20px' : undefined,
        borderBottomRightRadius: accordionType === ('bottom' ?? 'single') ? '20px' : undefined,
      }}
    >
      <AccordionSummary>
        <Typography>
          {header}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {details}
        {detailContent}
      </AccordionDetails>
    </MuiAccordion>
  )
}