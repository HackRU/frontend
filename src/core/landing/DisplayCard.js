import { CoreModule } from "@hackru/frontend-core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
const DisplayCard = CoreModule(
    ({ children, name, backgroundColor, sideBar }) => {
        return (
            <Card style={{
                backgroundColor
            }}>
  <Divider orientation="vertical" flexItem />

                <CardContent>
                    <Typography variant="h1">{name}</Typography>
                </CardContent>
            </Card>
        );
    },
    ["name", "backgroundColor", "sideBar"]
);

export default DisplayCard;
