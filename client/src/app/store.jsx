import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import designReducer from "../features/design/designSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    design: designReducer,
  },
});
