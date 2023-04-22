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

import React, { useState } from "react";

import TextField from "@atlaskit/textfield";

import s3Regions from "./s3-regions";
import gcsRegions from "./gcs-regions";
import azRegions from "./azure-regions";
import { Box } from "mds";
import Popup from "@atlaskit/popup";

const getRegions = (type: string): { label: string; value: string }[] => {
  if (type === "s3") {
    return s3Regions;
  }
  if (type === "gcs") {
    return gcsRegions;
  }
  if (type === "azure") {
    return azRegions;
  }

  return [];
};

const RegionSelect = ({
  type,
  onChange,
}: {
  type: "minio" | "s3" | "gcs" | "azure" | "unsupported";
  onChange: (obj: any) => void;
  inputProps?: any;
}) => {
  const regionList = getRegions(type);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popup
      isOpen={isOpen}
      content={() => (
        <div>
          {regionList.map((opt) => (
            <Box
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "baseline",
                padding: "4px",
                borderBottom: "1px solid #eaeaea",
                cursor: "pointer",
                width: "100%",

                "& .label": {
                  fontSize: "13px",
                  fontWeight: 500,
                },
                "& .value": {
                  fontSize: "11px",
                  fontWeight: 400,
                },
              }}
              onClick={() => {
                setValue(opt.value);
              }}
            >
              <span className="label">{opt.value}</span>
              <span className="value">{opt.label}</span>
            </Box>
          ))}
        </div>
      )}
      trigger={(triggerProps) => (
        <div {...triggerProps}>
          <TextField
            autoComplete="on"
            value={value}
            onChange={(val) => {
              onChange((val.target as any).value);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
        </div>
      )}
    ></Popup>
  );
};

export default RegionSelect;
