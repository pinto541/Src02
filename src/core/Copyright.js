import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

export default function Copyright() {
  return (
    <Box
      sx={{
        
      }}
      mt={8}
      pt={2}
      pb={2}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        
          WeUgly
        
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
