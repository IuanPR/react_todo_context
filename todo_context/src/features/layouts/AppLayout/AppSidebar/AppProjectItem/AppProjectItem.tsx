import { ThemeProvider } from "@emotion/react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useTodo } from "../../../../../hooks";
import { changeTheme } from "../../../../../custom/theme/changetheme";
import { ProjectItem } from "../../../../../types";

export function AppProjectItem({ project, projectId }: ProjectItem) {
  const { deleteProject, editProject } = useTodo();
  const [projectEditClicked, setProjectEditClicked] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>(project.title);
  const addEditProject = () => {
    if (project!.title.trim() !== "") {
      return setProjectEditClicked(!projectEditClicked);
    } else {
      return setProjectEditClicked(projectEditClicked);
    }
  };

  return (
    <ListItem
      sx={{
        paddingRight: 0,
      }}
      key={project.id}
    >
      {projectEditClicked === false ? (
        <ListItemButton
          selected={project.id === projectId}
          sx={{}}
          href={project.id}
        >
          <ListItemText
            sx={{
              overflowWrap: "break-word",
            }}
            primary={projectTitle}
          />
        </ListItemButton>
      ) : (
        <TextField
          variant="standard"
          value={projectTitle}
          inputProps={{ maxLength: 20 }}
          onChange={(e) => {
            setProjectTitle(e.target.value);
            editProject(project.id, projectTitle, project.tasks);
          }}
        />
      )}
      <Box
        sx={{
          marginTop: "1.5%",
          display: "inline-flex",
          width: "40%",
        }}
      >
        <Button
          sx={{
            width: "5px",
          }}
          onClick={() => addEditProject()}
        >
          <ThemeProvider theme={changeTheme}>
            <CreateIcon
              sx={{
                marginRight: "5px",
              }}
              color="secondary"
            />
          </ThemeProvider>
        </Button>
        <Button onClick={() => deleteProject(project.id)}>
          <DeleteForeverIcon color="error" />
        </Button>
      </Box>
    </ListItem>
  );
}
