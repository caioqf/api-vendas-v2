import { container } from "tsyringe";
import BcryptHashProvider from "./implementations/BcryptHashProvider";
import { IHashProvider } from "./models/IHashProvider";


container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
