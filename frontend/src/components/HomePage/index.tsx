import { Button, Container, Grid, Typography } from '@mui/material'

import { Link as RouterLink } from "react-router-dom";
export const HomePage = () => {
    return (
        <div>
            <Container maxWidth="md">
                <h4>Requirements</h4>
                <p>
                ระบบจัดซื้อยา เป็นระบบที่มีการจัดซื้อยาตามรายการคำสั่งซื้อของเจ้าหน้าที่จัดซื้อยา โดยเจ้าหน้าที่จัดซื้อยาจะทำการล็อกอินเพื่อเข้าระบบจัดซื้อยา 
                เจ้าหน้าที่จัดซื้อยาจะทำรายการคำสั่งซื้อและส่งรายการคำสั่งซื้อให้บริษัทผู้จำหน่ายยา  และรับยาจากบริษัทผู้จัดส่งยา 
                เจ้าหน้าที่จัดซื้อยาจะตรวจสอบจำนวนยาว่าครบตามรายการคำสั่งซื้อยา จากนั้นเจ้าหน้าที่จัดซื้อยาจะส่งยาเข้าระบบคลังยา
                </p>
                <Grid container>
                    <Grid item xs={10}>
                        <Button
                        component={RouterLink}
                        to="/order"
                        variant="contained"
                        >
                        สั่งซื้อยา
                        </Button>
                    </Grid>
                <Grid item xs={2}>
                    <Button
                    component={RouterLink}
                    to="/orderhistory"
                    variant="contained"
                    >
                    รายการสั่งซื้อยา
                    </Button>
                </Grid>
            </Grid>

        </Container>
 </div>
 )
}