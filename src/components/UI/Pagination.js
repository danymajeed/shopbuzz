import React from "react";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  inline: {
    display: "inline-block",
  },
  linkClass: {
    textTransform: "uppercase",
    letterSpacing: ".1rem",
    position: "relative",
    float: "left",
    padding: "8px 12px",
    lineHeight: 1.42857143,
    textDecoration: "none",
    color: "black",
    fontWeight: 600,
    border: "1px solid #ddd",
    marginLeft: "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  activeLinkClass: {
    backgroundColor: pink[200],
  },
});

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const classes = useStyles();
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <ReactPaginate
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        pageClassName={classes.inline}
        previousClassName={classes.inline}
        nextClassName={classes.inline}
        breakClassName={classes.inline}
        pageLinkClassName={classes.linkClass}
        breakLinkClassName={classes.linkClass}
        activeLinkClassName={classes.activeLinkClass}
        previousLinkClassName={classes.linkClass}
        nextLinkClassName={classes.linkClass}
        totalItemsCount={totalItems}
        onPageChange={paginate}
      />
    </>
  );
};

export default React.memo(Pagination);
