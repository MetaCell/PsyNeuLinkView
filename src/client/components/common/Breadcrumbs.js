import {
    Box,
    ClickAwayListener,
    IconButton,
    Link,
    MenuItem,
    Popper,
    Typography,
} from '@mui/material';
import React, {useMemo} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {makeStyles} from '@mui/styles';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import vars from '../../assets/styles/variables';
import {useSelector, useDispatch} from 'react-redux';
import {closeComposition, openComposition} from "../../redux/actions/general";
import ModelSingleton from "../../model/ModelSingleton";


const {dropdownSecBg, breadcrumbLinkColor, breadcrumbTextColor} = vars;

const useStyles = makeStyles(() => ({
    crumb: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        color: `${breadcrumbLinkColor} !important`,
    },
    expand: {
        padding: '0.125rem',
        borderRadius: '0.25rem',
    },
    lastCrumb: {
        display: 'flex',
        alignItems: 'center',
        color: breadcrumbTextColor,

        '& .MuiTypography-root': {
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            color: 'inherit',
        },
    },
    dropDown: {
        width: '8rem',
        maxWidth: 'content',
        background: dropdownSecBg,
        boxShadow:
            '0 0.25rem 2.5rem rgba(0, 0, 0, 0.1), 0 1rem 7.5rem rgba(60, 60, 67, 0.2)',
        padding: '0.375rem 0.25rem',
        borderRadius: '0.5rem',
        inset: '1rem auto auto 0 !important',

        '&:before': {
            content: '""',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0.75rem 0.75rem 0.75rem',
            borderColor: `transparent transparent ${dropdownSecBg} transparent`,
            position: 'absolute',
            top: '-0.5rem',
            left: '3rem',
        },

        '& .MuiMenuItem-root': {
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            whiteSpace: 'normal',
            borderRadius: '0.375rem',
            color: breadcrumbLinkColor,
            padding: '0.25rem 0.5rem',

            '&:hover': {
                color: breadcrumbTextColor,
            },
        },
    },
}));

const EXPAND_ID = 'expand';
const HOME_ID = 'home'

function Crumb({id, text, handleClick, href, last = false}) {
    const classes = useStyles();

    if (last) {
        return (
            <Box className={classes.lastCrumb}>
                <Typography>{text}</Typography>
                <ArrowDownIcon sx={{fontSize: '1rem', paddingLeft: '0.25rem'}}/>
            </Box>
        );
    }

    return (
        <Link
            underline="hover"
            href={href}
            onClick={(event) => {
                event.preventDefault();
                handleClick();
            }}
            className={classes.crumb}
        >
            {text}
        </Link>
    );
}

export const CustomBreadcrumbsWithMenu = ({max = 4}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const compositionOpened = useSelector(state => state.general.compositionOpened);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);

    const rawBreadcrumbs = compositionOpened?.getGraphPath() || [];

    const breadcrumbs = [{id: HOME_ID, text: 'Home'}].concat(
        rawBreadcrumbs.map((item, idx) => ({
            id: item,
            text: item,
        }))
    );

    const collapsed = !!breadcrumbs && breadcrumbs.length > max;
    const collapsedCrumbs = collapsed ? breadcrumbs.slice(1, breadcrumbs.length - (max - 1)) : [];

    const _breadcrumbs = useMemo(
        () => {
            if (!!breadcrumbs && breadcrumbs.length > 0) {
                if (breadcrumbs.length <= max) {
                    return breadcrumbs;
                }

                const firstItemCrumbs = breadcrumbs.slice(0, 1);
                const lastFourCrumbs = breadcrumbs.slice(-(max - 1));

                return firstItemCrumbs.concat(
                    [{id: EXPAND_ID}],
                    lastFourCrumbs
                );
            }

            return [];
        },
        [breadcrumbs, max]
    );


    const handleCrumbClick = (id) => {
        if (compositionOpened) {
            dispatch(closeComposition(compositionOpened));
        }
        if (id !== HOME_ID) {
            const metaGraph = ModelSingleton.getInstance().getMetaGraph()
            dispatch(openComposition(metaGraph.getNodeDFS(id)));
        }
    };


    const handleClick = (event) => {
        if (event && anchorEl === null) {
            setAnchorEl(event.currentTarget);
        } else if (anchorEl !== null) {
            setAnchorEl(null);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const id = open ? 'simple-popper-9' : undefined;

    return (
        <React.Fragment>
            {collapsedCrumbs && collapsedCrumbs.length > 1 && (
                <Popper
                    id={id}
                    open={open}
                    className={classes.dropDown}
                    anchorEl={anchorEl}
                    placement="bottom"
                    aria-labelledby="with-menu-breadcrumbs"
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box>
                            {collapsedCrumbs && collapsedCrumbs.length > 1
                                ? collapsedCrumbs.map((crumb) => (
                                    <MenuItem onClick={handleClose} key={crumb.id}>
                                        {crumb.text}
                                    </MenuItem>
                                ))
                                : null}
                        </Box>
                    </ClickAwayListener>
                </Popper>
            )}

            <Breadcrumbs
                aria-label="breadcrumbs"
                maxItems={_breadcrumbs.length}
                separator={<ArrowRightIcon sx={{fontSize: '1rem'}}/>}
            >
                {_breadcrumbs &&
                    _breadcrumbs.map((crumb, idx) => {
                        const index = idx + 1;

                        if (crumb.id === EXPAND_ID) {
                            return (
                                <Box>
                                    <IconButton
                                        size="sm"
                                        onClick={handleClick}
                                        aria-label="expand"
                                        className={classes.expand}
                                        key={crumb.id}
                                    >
                                        <MoreHorizIcon
                                            sx={{fontSize: '1rem'}}
                                            color={breadcrumbLinkColor}
                                        />
                                    </IconButton>
                                </Box>
                            );
                        }

                        return (
                            <Crumb
                                text={crumb.text}
                                key={crumb.id}
                                index={idx}
                                last={
                                    collapsed
                                        ? index === _breadcrumbs.length
                                        : index === breadcrumbs.length
                                }
                                handleClick={() => handleCrumbClick(crumb.id)}
                            />
                        );
                    })}
            </Breadcrumbs>
        </React.Fragment>
    );
};
