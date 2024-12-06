import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import { TreeItem2Content, TreeItem2Label, TreeItem2Root, TreeItem2Props, TreeItem2GroupTransition } from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeItem2DragAndDropOverlay } from "@mui/x-tree-view/TreeItem2DragAndDropOverlay";
import { useTreeItem2Utils } from "@mui/x-tree-view/hooks";
import { ChevronRightRounded, ExpandMore } from "@mui/icons-material";
import theme from "@/app/theme";

const TreeItem = React.forwardRef(function CustomTreeItem({ id, itemId, label, disabled, children }: TreeItem2Props, ref: React.Ref<HTMLLIElement>) {
	const { getRootProps, getContentProps, getLabelProps, getGroupTransitionProps, getDragAndDropOverlayProps, status } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

	const { interactions } = useTreeItem2Utils({
		itemId,
		children,
	});

	const handleClick = (event: React.MouseEvent) => {
		interactions.handleExpansion(event);
	};

	return (
		<TreeItem2Provider itemId={itemId}>
			<TreeItem2Root {...getRootProps()}>
				<Box sx={{ display: "flex" }}>
					{status.expandable && (
						<div>
							{status.expanded ? (
								<IconButton onClick={handleClick} aria-label="collapse item" size="small">
									<ExpandMore fontSize={"small"} />
								</IconButton>
							) : (
								<IconButton onClick={handleClick} aria-label="Expand item" size="small">
									<ChevronRightRounded fontSize={"small"} />
								</IconButton>
							)}
						</div>
					)}
					<TreeItem2Content {...getContentProps()} sx={{ marginLeft: status.expandable ? "0px" : "30px" }}>
						<TreeItem2Label {...getLabelProps()} sx={{ fontSize: theme.typography.fontSize }} />
						<TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
					</TreeItem2Content>
				</Box>
				{children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
			</TreeItem2Root>
		</TreeItem2Provider>
	);
});

export default TreeItem;
