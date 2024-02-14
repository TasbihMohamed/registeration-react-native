const initialState = {
  // data: [],
  governorates: [],
  specializations: [],
  cities: [],
  joinRequest: [],
  checkVerification: [],
  verifyRegisteration: [],
  password: [],
  loading: false,
  error: "",
};

// export const app = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_ALL_DATA:
//       return {
//         data: action.data
//       }
//     default:
//       return state;
//   }
// }

export const specializationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SPECIALIZAIONS":
      return {
        ...state,
        specializations: [],
        loading: true,
        error: "",
      };
    case "FETCH_SPECIALIZAIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        specializations: action.payload,
        error: "",
      };
    case "FETCH_SPECIALIZAIONS_FAIL":
      return {
        ...state,
        loading: false,
        specializations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//cities
export const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CITIES":
      return {
        ...state,
        cities: [],
        loading: true,
        error: "",
      };
    case "FETCH_CITIES_SUCCESS":
      return {
        ...state,
        loading: false,
        cities: action.payload,
        error: "",
      };
    case "FETCH_CITIES_FAIL":
      return {
        ...state,
        loading: false,
        cities: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const governoratesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GOVERNORATES":
      return {
        ...state,
        governorates: [],
        loading: true,
        error: "",
      };
    case "FETCH_GOVERNORATES_SUCCESS":
      return {
        ...state,
        loading: false,
        governorates: action.payload,
        error: "",
      };
    case "FETCH_GOVERNORATES_FAIL":
      return {
        ...state,
        loading: false,
        governorates: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const joinRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_JOINREQUEST":
      return {
        ...state,
        joinRequest: [],
        loading: true,
        error: "",
      };
    case "FETCH_JOINREQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        joinRequest: action.payload,
        error: "",
      };
    case "FETCH_JOINREQUEST_FAIL":
      return {
        ...state,
        loading: false,
        joinRequest: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const verifyRegisterationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_VERIFYREGISTERATION":
      return {
        ...state,
        verifyRegisteration: [],
        loading: true,
        error: "",
      };
    case "FETCH_VERIFYREGISTERATION_SUCCESS":
      return {
        ...state,
        loading: false,
        verifyRegisteration: action.payload,
        error: "",
      };
    case "FETCH_VERIFYREGISTERATION_FAIL":
      return {
        ...state,
        loading: false,
        verifyRegisteration: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// check doctor verification
export const checkVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHECKVERIFICATION":
      return {
        ...state,
        checkVerification: [],
        loading: true,
        error: "",
      };
    case "FETCH_CHECKVERIFICATION_SUCCESS":
      return {
        ...state,
        loading: false,
        checkVerification: action.payload,
        error: "",
      };
    case "FETCH_CHECKVERIFICATION_FAIL":
      return {
        ...state,
        loading: false,
        checkVerification: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PASSWORD":
      return {
        ...state,
        password: [],
        loading: true,
        error: "",
      };
    case "FETCH_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        password: action.payload,
        error: "",
      };
    case "FETCH_PASSWORD_FAIL":
      return {
        ...state,
        loading: false,
        password: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
