import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getProducts } from "../redux/slices/ProductSlice";
import { ProductInterface } from "../utilities/Interface";
import AppBarCompnent from "../Components/AppBar";
import CartList from "../Components/CartList";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  MenuItem,
  FormHelperText,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const colorArr = ["Black", "Stone", "Red"];
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { productsList, loading } = useSelector(
    (state: RootState) => state.Products
  );
  const [list, setList] = useState<any>([]);
  const [color, setColor] = React.useState("");
  const [total, settotal] = React.useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    if (productsList.length) {
      let arr = productsList.map((x: ProductInterface) => {
        return {
          ...x,
          Qty: 0,
          total: x.price * 0,
        };
      });
      setList(arr);
    }
  }, [productsList]);

  useEffect(() => {
    if (list.length) {
      let tot = list.reduce((a: number, b: ProductInterface) => {
        return a + b.total;
      }, 0);
      settotal(tot.toFixed(2));
    }
  }, [list]);
  const updateQty = useCallback(
    (opr: string, index: number, Qty: number) => {
      if (Qty < 1 && opr === "decrement") return;

      let arr = [...list];
      if (opr === "increment") {
        let updatedQty = arr[index].Qty + 1;
        arr[index].Qty = updatedQty;
        arr[index].total = arr[index].price * updatedQty;
      } else if (opr === "decrement") {
        let updatedQty = arr[index].Qty - 1;
        arr[index].Qty = updatedQty;
        arr[index].total = arr[index].price * updatedQty;
      } else {
        let updatedQty = 0;
        arr[index].Qty = updatedQty;
        arr[index].total = arr[index].price * updatedQty;
      }

      setList(arr);
    },
    [list]
  );

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value);
    if (event.target.value === "") {
      let arr = productsList.map((x: ProductInterface) => {
        return { ...x, Qty: 0, total: x.price * 0 };
      });
      setList(arr);
    } else {
      let arr = productsList.filter(
        (x: ProductInterface) => x.colour === event.target.value
      );
      arr = arr.map((x: ProductInterface) => {
        return { ...x, Qty: 0, total: x.price * 0 };
      });
      setList(arr);
    }
  };

  return (
    <>
      <AppBarCompnent />
      <Container maxWidth="lg">
        <div style={{ height: 10 }}></div>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <FormHelperText>Colour Filter</FormHelperText>
          <Select
            value={color}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {colorArr.map((x: string) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading === true && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <CircularProgress />
          </div>
        )}
        {list.map((x: ProductInterface, i: number) => (
          <div key={x.id} style={{ margin: 10 }}>
            <CartList data={x} index={i} updateQty={updateQty} />
          </div>
        ))}
        {loading === false && (
          <Grid container spacing={2}>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="div" variant="h6">
                      Total £ {total}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default App;
