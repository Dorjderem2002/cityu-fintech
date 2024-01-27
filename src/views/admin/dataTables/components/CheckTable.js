import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Behind our Algorithm
        </Text>
        <Menu />
      </Flex>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='16px'
          fontWeight='700'
          lineHeight='100%'>
          We have conducted the tuning of hyperparameters for each model in our study. The LSTM model, when used in conjunction with RNNs, yielded significantly higher accuracy scores, albeit at the expense of compromised RMSE and MAE scores. To strike a better balance between accuracy and other metrics, we integrated our ARIMA model into the framework. Our ensemble model thus combines both the ARIMA and LSTM models, resulting in a notable improvement in accuracy with minimal margin of error. This amalgamation provides the requisite features for our additional machine learning model, which functions as a recommender system. This recommender system facilitates the connection between buyers and sellers, thereby contributing to the development of a carbon token market.
        </Text>

      </Flex>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='16px'
          fontWeight='700'
          lineHeight='100%'>
          Furthermore, the integration of the ARIMA and LSTM models in our ensemble approach offers several advantages in the context of creating a market for carbon tokens. By leveraging the strengths of both models, we are able to enhance the accuracy of our predictions while also considering the tradeoff between various evaluation metrics. The ARIMA model, with its time series analysis capabilities, captures the temporal patterns and trends in carbon token data, providing valuable insights into the market dynamics. On the other hand, the LSTM model, with its ability to capture long-term dependencies, excels in capturing complex relationships and patterns in the data. By combining these models, we can leverage the accuracy of the LSTM model while incorporating the interpretability and temporal aspects of the ARIMA model. This holistic approach allows us to build a robust recommender system that connects buyers and sellers effectively, facilitating the growth of the carbon token market and promoting sustainable investment practices.
        </Text>
      </Flex>
    </Card >
  );
}
