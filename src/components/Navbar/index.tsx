import {
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Brightness7,
  Brightness4,
  FavoriteRounded,
  ShoppingCartRounded,
  Menu,
  PersonRounded,
  Logout,
} from "@mui/icons-material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme, useShoppingCart, useSession } from "hooks";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Input } from "components";
import { useRef, useState } from "react";

const pageMenuItems = [
  { label: "Todos", href: "/" },
  { label: "Celulares", href: "/?category=smartphones" },
  { label: "Eletrodomésticos", href: "/?category=eletrodomesticos" },
  { label: "Informática", href: "/?category=electronics" },
  { label: "Eletroportáteis", href: "/?category=electronics" },
  { label: "Homens", href: "/?category=men's clothing" },
  { label: "Brinquedos", href: "/?category=brinquedos" },
  { label: "Jóias", href: "/?category=jewelery" },
  { label: "Dia das mães", href: "/?category=women's clothing" },
];

const headerMenuItems = (
  user: User | null,
  cartLength: number | undefined,
  navigate: NavigateFunction,
  mode: string,
  toggleColorMode: () => void,
  signOut: () => void,
) => {
  const cartMenuIcon = (
    <Badge badgeContent={cartLength} color="error">
      <ShoppingCartRounded className="text-white" />
    </Badge>
  );

  const menuItems = [
    {
      label: user ? "Minha conta" : "Entrar",
      icon: <PersonRounded className="text-white" />,
      action: () => navigate("/account"),
    },
    {
      label: "Carrinho",
      icon: cartMenuIcon,
      action: () => navigate("/cart"),
    },
    { label: "Favoritos", icon: <FavoriteRounded className="text-white" /> },
    {
      label: `Tema ${mode === "dark" ? "claro" : "escuro"}`,
      icon:
        mode === "dark" ? (
          <Brightness7 color="primary" />
        ) : (
          <Brightness4 className="text-white" />
        ),
      action: () => toggleColorMode(),
    },
  ];

  if (user !== null) {
    menuItems.push({
      label: "Sair",
      icon: <Logout className="text-white" />,
      action: () => signOut(),
    });
  }

  return menuItems;
};

const DrawerMenu = ({
  headerMenuItems,
  badgeCount,
}: {
  headerMenuItems: { label: string; icon: JSX.Element; action?: () => void }[];
  badgeCount: number;
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen((prevState) => !prevState)}
    >
      <List>
        {headerMenuItems.map(({ label, icon, action }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={action}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {isMobile ? (
        <IconButton onClick={() => setOpen((prevState) => !prevState)}>
          <Badge badgeContent={badgeCount} color="error">
            <Menu className="text-white" />
          </Badge>
        </IconButton>
      ) : (
        <div className="flex items-center gap-3">
          {headerMenuItems.map(({ label, icon, action }, index) => (
            <Tooltip title={label} key={index}>
              <IconButton onClick={action}>{icon}</IconButton>
            </Tooltip>
          ))}
        </div>
      )}
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
};

export const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    palette: { mode },
  } = useMuiTheme();
  const { toggleColorMode } = useTheme();
  const { cart } = useShoppingCart();
  const { user, signOut } = useSession();
  const [search, setSearch] = useState<string>();

  return (
    <AppBar className="h-40 shadow-md" position="static">
      <Container
        className="flex h-3/4 w-full items-center gap-4 max-md:gap-3"
        maxWidth="xl"
      >
        <img
          className="mr-4 h-32 w-32 cursor-pointer max-md:h-16 max-md:w-16"
          src="/logo.png"
          alt="logo"
          onClick={() => navigate("/")}
        />
        <Input
          className="mb-2 mt-6 w-full"
          label="Pesquisar por produtos"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              navigate(`/?search=${search}`);
            }
          }}
        />
        <DrawerMenu
          headerMenuItems={headerMenuItems(
            user,
            cart.length,
            navigate,
            mode,
            toggleColorMode,
            signOut,
          )}
          badgeCount={cart.length}
        />
      </Container>
      <Paper className="flex h-1/4 rounded-none border-none shadow-none">
        <Container
          ref={ref}
          className="scrollbar-hide flex h-full justify-between overflow-x-auto"
          maxWidth="xl"
        >
          {pageMenuItems.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="flex h-full items-center border-b-blue-500 px-4 hover:border-b-2 hover:text-blue-500"
            >
              <Typography className="text-nowrap text-sm font-bold uppercase">
                {label}
              </Typography>
            </Link>
          ))}
        </Container>
      </Paper>
    </AppBar>
  );
};
