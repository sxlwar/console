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

import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";
import { Fragment } from "react";
import { withStyles } from "../../../../../../theme/makeStyles";

import { Box, Grid } from "mds";
import {
  detailsPanel,
  spacingUtils,
} from "../../../../Common/FormComponents/common/styleLibrary";

interface IObjectMetadata {
  metaData: any;
  classes?: any;
  linear?: boolean;
}

const styles = () => ({
  titleItem: {
    width: "35%",
  },
  ...spacingUtils,
  ...detailsPanel,
});

const ObjectMetaData = ({
  metaData,
  classes,
  linear = false,
}: IObjectMetadata) => {
  const metaKeys = Object.keys(metaData);

  if (linear) {
    return (
      <Fragment>
        {metaKeys.map((element: string, index: number) => {
          const renderItem = Array.isArray(metaData[element])
            ? metaData[element].map(decodeURIComponent).join(", ")
            : decodeURIComponent(metaData[element]);

          return (
            <Box
              className={classes.metadataLinear}
              key={`box-meta-${element}-${index.toString()}`}
            >
              <strong>{element}</strong>
              <br />
              {renderItem}
            </Box>
          );
        })}
      </Fragment>
    );
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: "25px",
          marginBottom: "5px",
        }}
      >
        <h3
          style={{
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          Object Metadata
        </h3>
      </Grid>

      <Grid item xs={12}>
        <TableTree>
          <Rows
            items={metaKeys}
            render={(element: any) => {
              const renderItem = Array.isArray(metaData[element])
                ? metaData[element].map(decodeURIComponent).join(", ")
                : decodeURIComponent(metaData[element]);

              return (
                <Row>
                  <Cell>{element}</Cell>
                  <Cell>{renderItem}</Cell>
                </Row>
              );
            }}
          />
        </TableTree>
      </Grid>
    </Grid>
  );
};

export default withStyles(ObjectMetaData, styles);
