import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String, 
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    sampleTables: [
      {
        tableName: {
          type: String,
          required: true,
        },

        columns: [
          {
            columnName: {
              type: String,
              required: true,
            },
            dataType: {
              type: String,
              required: true,
            },
          },
        ],

        rows: [
          {
            type: mongoose.Schema.Types.Mixed,
          },
        ],
      },
    ],

    expectedOutput: {
      type: {
        type: String,
        enum: ["table", "count", "single_value", "column"],
        required: true,
      },

      value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
