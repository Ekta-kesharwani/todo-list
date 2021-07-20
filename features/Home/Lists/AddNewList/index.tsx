import React from "react"
import useLists from "./service";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import { Button, Checkbox } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';

const useStylesAlert = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width:'100%',
            [theme.breakpoints.up("md")]: {
                width:400
              },
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
            marginTop:10,
            marginBottom:10
        },
    }),
);
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 4,
            width:'100%',
            [theme.breakpoints.up("md")]: {
                width:400
              }
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);
const AddNewList = () => {
    const service = useLists()
    const classes = useStyles();
    const alertClasses = useStylesAlert();
    return (
        <>
            <Button size="small" color="primary" className={"float-right"} startIcon={<AddIcon />} onClick={async () => {
                service.setIsAddlistComponentShow(true)
            }}>
                Add new list
            </Button>
            {service.isAddlistComponentShow && (
                <div>
                    <InputBase
                        placeholder="Title"
                        onChange={(event) => {
                            service.addNewListTitle(event.target.value)
                        }}
                        className={"my-2"}
                        style={{width:'100%'}}
                    />
                    {service.newList?.list_items?.map((eachItem, index) => {
                        return (
                            <Paper component="form" className={classes.root}>
                                <Checkbox checked={eachItem?.checked} name={eachItem?.item} onChange={() => { service.toggleNewItemsCheck(index) }} />
                                <InputBase
                                    className={classes.input}
                                    placeholder="List item"
                                    onChange={(event) => {
                                        service.addNewListItemName(index, event.target.value)
                                    }}
                                /> </Paper>
                        )
                    })}
                    {service.newListError && (
                        <div className={alertClasses.root}>
                            <Alert severity="error">{service.newListError}</Alert>
                        </div>
                    )}
                    <Button size="small" color={"primary"} startIcon={<AddIcon />} onClick={service.addNewListItem} >
                        Add Item
                    </Button>
                    <Button size="small" color={"primary"} startIcon={<SaveIcon />} onClick={
                        () => {
                            service.saveNewList()
                        }
                    } >
                        Save
                    </Button>
                </div>
            )}
        </>
    )

}
export default AddNewList