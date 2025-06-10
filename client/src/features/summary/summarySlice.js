import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createSummary = createAsyncThunk(
  'summary/create',
  async (videoUrl, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/summaries`,
        { videoUrl },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const listSummaries = createAsyncThunk(
  'summary/list',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/summaries`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const summarySlice = createSlice({
  name: 'summary',
  initialState: {
    summaries: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    resetSummaryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSummary.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.summaries.unshift(action.payload);
      })
      .addCase(createSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listSummaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(listSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries = action.payload;
      })
      .addCase(listSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetSummaryState } = summarySlice.actions;
export default summarySlice.reducer;