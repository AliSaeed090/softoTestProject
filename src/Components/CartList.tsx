import Box from "@mui/material/Box";
import React from "react";
import {
  Grid,
   Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
interface propsData {
  colour?: string;
  id?: number;
  img: string;
  name: string;
  price: number;
  Qty?: number;
  
}
interface Props {
  data: propsData;
  index:number;
  updateQty:Function
}
function CartList(props: Props) {
  let { Qty, img, name, price } = props.data;
  let index = props.index;
  const updateQty = props.updateQty;
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: 60, height: 100, objectFit: "cover" }}
              src={img}
              alt={"item.title"}
              loading="lazy"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography data-testid="name" component="div" variant="h6">
                {name}
              </Typography>
              <Typography
                data-testid="price"
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                £{price}
              </Typography>
            </CardContent>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => updateQty("increment", index, Qty)}
                style={{
                  padding: 20,
                  background: "#f2f2f2",
                  borderRadius: 4,
                }}
              >
                {" "}
                +{" "}
              </IconButton>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  data-testid="Qty"
                  style={{ padding: 10, textAlign: "center" }}
                  component="div"
                  variant="subtitle1"
                >
                  {Qty}
                </Typography>
                <Typography
                  onClick={() => updateQty("remove", index, 0)}
                  style={{
                    padding: 10,
                    textAlign: "center",
                    border:"0px",
                    backgroundColor:"transparent",
                    cursor:"pointer"
                  }}
                  component="button"
                  variant="subtitle1"
                >
                  Remove
                </Typography>
              </div>

              <IconButton
                onClick={() => updateQty("decrement", index, Qty)}
                style={{
                  padding: 20,
                  background: "#f2f2f2",
                  borderRadius: 4,
                }}
              >
                {" "}
                -{" "}
              </IconButton>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default React.memo(CartList);
