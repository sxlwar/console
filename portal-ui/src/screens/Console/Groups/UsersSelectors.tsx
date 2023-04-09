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

import React, { useCallback, useEffect, useState } from "react";

import ProgressBar from "@atlaskit/progress-bar";
import get from "lodash/get";
import { Grid } from "mds";
import { withStyles } from "../../../theme/makeStyles";
import { usersSort } from "../../../utils/sortFunctions";
import {
  actionsTray,
  selectorsCommon,
  tableStyles,
} from "../Common/FormComponents/common/styleLibrary";
import { UsersList } from "../Users/types";

import api from "../../../common/api";
import { ErrorResponseHandler } from "../../../common/types";
import SearchBox from "../Common/SearchBox";
import TableWrapper from "../Common/TableWrapper/TableWrapper";

import { useAppDispatch } from "../../../store";
import { setModalErrorSnackMessage } from "../../../systemSlice";

interface IGroupsProps {
  classes?: any;
  selectedUsers: string[];
  setSelectedUsers: any;
  editMode?: boolean;
}

const styles = () => ({
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    // paddingTop: 15,
    boxShadow: "none",
    border: 0,
  },

  tableBlock: {
    ...tableStyles.tableBlock,
  },
  searchBox: {
    flex: 1,
  },
  ...actionsTray,
  actionsTitle: {
    fontSize: 14,
    alignSelf: "center",
    minWidth: 160,
    marginRight: 10,
  },
  noFound: {
    textAlign: "center",
    // padding: theme.spacing(3),
    border: "1px solid #EAEAEA",
    fontSize: ".9rem",
  },
  ...selectorsCommon,
});

const UsersSelectors = ({
  classes,
  selectedUsers,
  setSelectedUsers,
  editMode = false,
}: IGroupsProps) => {
  const dispatch = useAppDispatch();
  //Local States
  const [records, setRecords] = useState<any[]>([]);
  const [loading, isLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const fetchUsers = useCallback(() => {
    api
      .invoke("GET", `/api/v1/users`)
      .then((res: UsersList) => {
        let users = get(res, "users", []);

        if (!users) {
          users = [];
        }

        setRecords(users.sort(usersSort));
        isLoading(false);
      })
      .catch((err: ErrorResponseHandler) => {
        dispatch(setModalErrorSnackMessage(err));
        isLoading(false);
      });
  }, [dispatch]);

  //Effects
  useEffect(() => {
    isLoading(true);
  }, []);

  useEffect(() => {
    if (loading) {
      fetchUsers();
    }
  }, [loading, fetchUsers]);

  const selUsers = !selectedUsers ? [] : selectedUsers;

  //Fetch Actions
  const selectionChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetD = e.target;
    const value = targetD.value;
    const checked = targetD.checked;

    let elements: string[] = [...selUsers]; // We clone the selectedGroups array

    if (checked) {
      // If the user has checked this field we need to push this to selectedGroupsList
      elements.push(value);
    } else {
      // User has unchecked this field, we need to remove it from the list
      elements = elements.filter((element) => element !== value);
    }
    setSelectedUsers(elements);

    return elements;
  };

  const filteredRecords = records.filter((elementItem) =>
    elementItem.accessKey.includes(filter)
  );

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <div className={classes.paper}>
          {loading && <ProgressBar />}
          {records !== null && records.length > 0 ? (
            <React.Fragment>
              <Grid item xs={12} className={classes.actionsTray}>
                <label className={classes.actionsTitle}>
                  {editMode ? "Edit Members" : "Assign Users"}
                </label>
                <div className={classes.searchBox}>
                  <SearchBox
                    placeholder="Filter Users"
                    adornmentPosition="end"
                    onChange={setFilter}
                    value={filter}
                  />
                </div>
              </Grid>
              <Grid item xs={12} className={classes.tableBlock}>
                <TableWrapper
                  columns={[{ label: "Access Key", elementKey: "accessKey" }]}
                  onSelect={selectionChanged}
                  selectedItems={selUsers}
                  isLoading={loading}
                  records={filteredRecords}
                  entityName="Users"
                  idField="accessKey"
                  customPaperHeight={classes.multiSelectTable}
                />
              </Grid>
            </React.Fragment>
          ) : (
            <div className={classes.noFound}>No Users to display</div>
          )}
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(UsersSelectors, styles);
