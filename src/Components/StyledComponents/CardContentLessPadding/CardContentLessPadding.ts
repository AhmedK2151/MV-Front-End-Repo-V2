import { CardContent, styled } from "@mui/material";

export const CardContentLessPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 0;
  }
`);