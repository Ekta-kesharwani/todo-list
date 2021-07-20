import React, { useEffect } from "react"
import Typography from '@material-ui/core/Typography';
import useLists from "./service";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Checkbox, Divider, FormControl, FormControlLabel, FormGroup, InputBase } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Loader from "../../../../components/Loader";
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { NewItemEmitter } from "../../../../utils/NewItemsEmitter";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            width: '100%',
            [theme.breakpoints.up("md")]: {
                width: 400
            },
        }
    })
);
const useStylesAlert = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            [theme.breakpoints.up("md")]: {
                width: 400
            },
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
            marginTop: 10,
            marginBottom: 10
        },
    }),
);
const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(3),
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            width: '100%',
            [theme.breakpoints.up("md")]: {
                width: 400
            },
        },

    }),
);
const Index = () => {
    const service = useLists()
    const classes = useStyles();
    const checkBoxclasses = useStyles1();
    const alertClasses = useStylesAlert()

    useEffect(() => {
        init()
    }, [])
    const init = () => {
        service.getUserDetails()
    }
    NewItemEmitter.on("action", () => {
        init()
    })
    return (
        <>
            {service.isLoading ? (
                <Loader />
            ) : (
                <div style={{ width: '100%' }}>
                    <Box display="flex" flexWrap="wrap" alignItems="flex-start" bgcolor="background.paper">
                        {service.details?.map((eachList, index) => {
                            return (
                                <Box p={1} key={index}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {eachList?.title}
                                                </Typography>
                                                <Divider />
                                                <div className={checkBoxclasses.root}>
                                                    <FormControl component="fieldset" className={checkBoxclasses.formControl}>
                                                        <FormGroup>
                                                            {eachList?.list_items?.map((eachItem, index1) => {
                                                                return (
                                                                    <>
                                                                        <FormControlLabel
                                                                            control={<Checkbox checked={eachItem?.checked} disabled={!eachList.isEditable} onChange={() => { service.toggleListItemsCheck(index, index1) }} name={eachItem?.item} readOnly={!eachList?.isEditable} />}
                                                                            label={eachList.isEditable ? (<InputBase
                                                                                className={checkBoxclasses.input}
                                                                                placeholder="List item"
                                                                                value={eachItem.item}
                                                                                onChange={(event) => {
                                                                                    service.changeListItemName(index, index1, event.target.value)
                                                                                }}
                                                                                readOnly={!eachList?.isEditable}
                                                                            />) : (eachItem?.item)}
                                                                            key={index1}
                                                                        />

                                                                    </>

                                                                )
                                                            })}
                                                        </FormGroup>

                                                    </FormControl>

                                                </div>
                                                {eachList.isEditable && (<Button size="small" color="primary" className={"float-right"} startIcon={<AddIcon />} onClick={async () => {
                                                    service.addItem(index)
                                                }}>
                                                    Add Item
                                                </Button>)}
                                                {eachList.error && (
                                                    <div className={alertClasses.root}>
                                                        <Alert severity="error">{eachList.error}</Alert>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </CardActionArea>

                                        <CardActions>
                                            <Button size="small" color={"primary"} variant={eachList.isEditable ? "contained" : undefined} startIcon={<EditIcon />} onClick={() => { service.toggleListEdit(index) }} >
                                                Edit List
                                            </Button>
                                            <Button size="small" color="primary" startIcon={<DeleteIcon />} onClick={async () => {
                                                await service.deleteList(eachList?.list_id || "")
                                                init()
                                            }}>
                                                Delete List
                                            </Button>
                                            {eachList.isEditable && (
                                                <Button size="small" color={"primary"} startIcon={<SaveIcon />} onClick={async () => {
                                                    await service.updateListItems(eachList?.list_id || "", index)
                                                    //init()

                                                }} >
                                                    Save
                                                </Button>
                                            )}
                                        </CardActions>
                                    </Card>
                                </Box>
                            )
                        })}
                    </Box>
                </div>
            )}
        </>
    )

}
export default Index