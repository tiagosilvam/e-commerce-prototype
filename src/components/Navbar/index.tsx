import {
  AppBar,
  Badge,
  Box,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
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
  InfoOutlined,
} from "@mui/icons-material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme, useShoppingCart, useSession } from "hooks";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Input } from "components";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";

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

const handleSearch = async (
  search: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const products: Product[] = await axios
    .post(`${process.env.REACT_APP_PRODUCTS_API_URL}/products`)
    .then(({ data }) => data)
    .finally(() => setLoading(false));

  return products.filter(({ title }) =>
    title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
};

export const Navbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    palette: { mode },
  } = useMuiTheme();
  const { toggleColorMode } = useTheme();
  const { cart } = useShoppingCart();
  const { user, signOut } = useSession();
  const [search, setSearch] = useState<string>();
  const [searchFocus, setSearchFocus] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);

  const debounced = useDebouncedCallback((value) => {
    handleSearch(value, setLoading).then(setProducts).catch(console.error);
  }, 1500);

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
        <div className="w-full">
          <Input
            ref={inputRef}
            className="mb-2 mt-6 w-full"
            label="Pesquisar por produtos"
            onChange={(e) => {
              setSearch(e.target.value);
              setLoading(true);
              debounced(e.target.value);
            }}
            onFocus={() => setSearchFocus(true)}
            autoComplete="off"
          />
          <Popover
            className="mt-2 w-full"
            anchorEl={inputRef.current}
            open={searchFocus && !!search}
            onClose={() => setSearchFocus(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            disableAutoFocus
            disablePortal
          >
            <div className="max-w-[700px] p-4">
              {!loading ? (
                products ? (
                  products.map(({ title, image, id }) => (
                    <div
                      className="mt-2 flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-gray-200"
                      onClick={() => navigate(`/products/${id}`)}
                    >
                      <img
                        src={image}
                        className="min-h-8 min-w-8"
                        alt={title}
                      />
                      <Typography className="truncate">{title}</Typography>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center space-x-2">
                    <InfoOutlined fontSize="small" className="text-gray-500" />
                    <Typography className="text-sm italic text-gray-500">
                      Não existem produtos a serem exibidos na pesquisa
                    </Typography>
                  </div>
                )
              ) : (
                <div className="flex items-center space-x-4">
                  <CircularProgress size="1.3rem" />
                  <Typography className="text-sm italic text-gray-500">
                    Pesquisando...
                  </Typography>
                </div>
              )}
            </div>
          </Popover>
        </div>
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
