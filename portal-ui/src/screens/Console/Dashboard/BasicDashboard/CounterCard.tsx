// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import { Box, Tooltip } from 'mds';

const CounterCard = ({
  counterValue,
  label = "",
  icon = null,
  actions = null,
  loading = false,
}: {
  counterValue: string | number;
  label?: any;
  icon?: any;
  actions?: any;
  loading?: boolean;
}) => {
  return (
    <Box
      sx={{
        fontFamily: "Inter,sans-serif",
        color: "#07193E",
        maxWidth: "300px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        cursor: "default",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          width: "100%",
          padding: "0 8px 0 8px",
          position: "absolute",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexFlow: "column",
            marginTop: "8px",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {label}
          </Box>

          <Tooltip tooltip={counterValue} placement="bottom">
            <Box
              sx={{
                fontSize:
                  counterValue.toString().length >= 5
                    ? "45px"
                    : "50px",

                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 187,
                flexFlow: "row",
              }}
            >
              {counterValue}
            </Box>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "8px",
            maxWidth: "26px",
            "& .min-icon": {
              width: "16px",
              height: "16px",
            },
          }}
        >
          {icon}

          <Box
            sx={{
              display: "flex",
            }}
          >
            {actions}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CounterCard;
