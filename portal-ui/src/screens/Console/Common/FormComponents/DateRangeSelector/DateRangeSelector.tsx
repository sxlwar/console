// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
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
import { Box, Button, OpenListIcon, SyncIcon, Grid, TimeIcon } from "mds";
import { DateTime } from "luxon";
import RecentIcon from "@atlaskit/icon/glyph/recent";
import DateTimePickerWrapper from "../DateTimePickerWrapper/DateTimePickerWrapper";

interface IDateRangeSelector {
  timeStart: DateTime | null;
  setTimeStart: (value: DateTime | null) => void;
  timeEnd: DateTime | null;
  setTimeEnd: (value: DateTime | null) => void;
  triggerSync?: () => void;
  label?: string;
  startLabel?: string;
  endLabel?: string;
}

const DateFilterAdornIcon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "& .min-icon": {
          width: "10px",
          height: "10px",
        },
      }}
    >
      <OpenListIcon />
    </Box>
  );
};

const DateRangeSelector = ({
  timeStart,
  setTimeStart,
  timeEnd,
  setTimeEnd,
  triggerSync,
  label = "Filter:",
  startLabel = "Start Time:",
  endLabel = "End Time:",
}: IDateRangeSelector) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        "& .filter-date-input-label, .end-time-input-label": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          height: "40px",
          alignItems: "center",
          gridTemplateColumns: "auto 2fr auto",
          padding: "0",
          gap: "5px",
        }}
      >
        <Box sx={{ fontSize: "14px", fontWeight: 500, marginRight: "5px" }}>
          {label}
        </Box>
        <Box
          sx={{
            display: "grid",
            height: "40px",
            border: "1px solid #eaeaea",
            alignItems: "center",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              height: "30px",
              alignItems: "center",
              gridTemplateColumns: "12px auto 1fr",
              gap: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& .min-icon": {
                  width: "10px",
                  height: "10px",
                  fill: "#B4B5B4",
                },
              }}
            >
              <TimeIcon className="min-icon" />
            </Box>
            <Box
              sx={{
                fontSize: "12px",
                marginLeft: "8px",
              }}
            >
              {startLabel}
            </Box>
            <Box>
              <DateTimePickerWrapper
                value={timeStart}
                onChange={setTimeStart}
                id="stTime"
                classNamePrefix={"filter-date-"}
                forFilterContained
                noInputIcon={true}
                openPickerIcon={DateFilterAdornIcon}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              height: "30px",
              alignItems: "center",
              gridTemplateColumns: "12px auto 1fr",
              gap: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& .min-icon": {
                  width: "10px",
                  height: "10px",
                  fill: "#B4B5B4",
                },
              }}
            >
              <RecentIcon label="" size="small" />
            </Box>
            <Box
              sx={{
                fontSize: "12px",
                marginLeft: "8px",
              }}
            >
              {endLabel}
            </Box>
            <Box>
              <DateTimePickerWrapper
                value={timeEnd}
                onChange={setTimeEnd}
                id="endTime"
                classNamePrefix={"filter-date-"}
                forFilterContained
                noInputIcon={true}
                openPickerIcon={DateFilterAdornIcon}
              />
            </Box>
          </Box>
        </Box>

        {triggerSync && (
          <Box
            sx={{
              alignItems: "flex-end",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              id={"sync"}
              type="button"
              variant="callAction"
              onClick={triggerSync}
              icon={<SyncIcon />}
              label={"Sync"}
            />
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default DateRangeSelector;
