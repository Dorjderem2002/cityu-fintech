/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <TradingViewWidget
          symbol="TSX:CARB"
          theme={Themes.DARK}
          locale="fr"
          width="100%"
          
        />
    </Box>
  );
}


