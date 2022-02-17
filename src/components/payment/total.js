import { Flex, Text } from "@theme-ui/components"
import React, { useContext } from "react"
import OrderContext from "../../context/order-context"
import { useState } from "react"

const Total = () => {
  const [price, setPrice] = useState()
  const { cart } = useContext(OrderContext)
  const getPrice = () => {
    require("axios")
      .get(
        `https://api.nomics.com/v1/currencies/ticker?ids=SOL&key=7417200ca32da87c2d9f71b93a78ec3fbaebb631&convert${cart.region.currency_code.toUpperCase()}`
      )
      .then(response => {
        setPrice(response)
      })
  }
  return (
    <Flex
      sx={{
        flexDirection: "column",
        mt: "1em",
        mb: "8px",
        py: "16px",
        borderBottom: "1px solid #E5E7EB",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          mb: "8px",
        }}
      >
        <Text sx={{ color: "#6B7280", fontSize: "12px" }}>Subtotal</Text>
        <Text sx={{ fontWeight: 400, color: "#111827", fontSize: "12px" }}>
          {(cart.subtotal / 100) * (1 + cart.region.tax_rate / 100)}{" "}
          {cart.region.currency_code.toUpperCase()}
         
        </Text>
      </Flex>
      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          mb: "8px",
        }}
      >
        <Text sx={{ color: "#6B7280", fontSize: "12px" }}>Shipping</Text>
        <Text sx={{ fontWeight: 400, color: "#111827", fontSize: "12px" }}>
          {(cart.shipping_total / 100) * (1 + cart.region.tax_rate / 100)}{" "}
          {cart.region.currency_code.toUpperCase()}
        </Text>
      </Flex>
      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text sx={{ fontWeight: 500, color: "#111827", fontSize: "12px" }}>
          Total
        </Text>
        <Text sx={{ fontWeight: 500, color: "#111827", fontSize: "12px" }}>
          {/* get the SOL price */}
          {price ? "" : getPrice()}
          {price
            ? `(${
                ((cart.total / 100) * (1 + cart.region.tax_rate / 100)) /
                price.data[0].price
              } SOL) `
            : ""}{" "}
          {(cart.total / 100) * (1 + cart.region.tax_rate / 100)}{" "}
          {cart.region.currency_code.toUpperCase()}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Total
