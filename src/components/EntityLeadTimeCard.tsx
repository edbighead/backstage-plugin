import React from "react";
import { InfoCard } from "@backstage/core-components";
import { stringifyEntityRef } from "@backstage/catalog-model";
import { useEntity } from "@backstage/plugin-catalog-react";
import useAsync from "react-use/lib/useAsync";
import { Progress, ResponseErrorPanel } from "@backstage/core-components";
import { useApi } from "@backstage/core-plugin-api";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { dxApiRef } from "../api";
import { LineChart } from "./LineChart";

export const EntityLeadTimeCard = () => {
  const dxApi = useApi(dxApiRef);

  const { entity } = useEntity();

  const {
    value: response,
    loading,
    error,
  } = useAsync(async () => {
    const entityRef = stringifyEntityRef(entity);
    return await dxApi.leadTime(entityRef);
  }, [dxApi, entity]);

  if (loading) {
    return <Progress />;
  } else if (error || !response?.data) {
    return <ResponseErrorPanel error={error || new Error("Unknown Error")} />;
  }

  return (
    <InfoCard
      title={
        <Box display="flex" alignItems="center" gridGap="8px">
          Lead time
          <Tooltip
            title={
              <Typography variant="body2">
                This is the time between a pull request being opened and it
                being deployed. The overall value shown is the mean.
              </Typography>
            }
            placement="top"
          >
            <InfoOutlinedIcon style={{ opacity: 0.6, fontSize: 20 }} />
          </Tooltip>
        </Box>
      }
      deepLink={{
        link: "https://app.getdx.com/datacloud/reports/dora",
        title: "View in DX",
      }}
    >
      <LineChart
        data={response.data}
        unit={response.unit}
        total={response.total}
      />
    </InfoCard>
  );
};
