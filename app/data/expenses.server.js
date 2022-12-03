import { prisma } from "./database.server";

export const addExpense = async ({ title, amount, date }, userId) => {
  try {
    return await prisma.expense.create({
      data: {
        title,
        amount: +amount,
        date: new Date(date),
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add the Expense");
  }
};

export const getExpenses = async (userId) => {
  if (!userId) {
    throw new Error("Failed to get the Expenses");
  }
  try {
    return await prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get the Expenses");
  }
};

export const getExpense = async (id) => {
  try {
    return await prisma.expense.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get the Expenses");

    // throw error;
  }
};

export const updateExpense = async (id, updatedData) => {
  try {
    return await prisma.expense.update({
      where: {
        id,
      },
      data: {
        title: updatedData.title,
        amount: +updatedData.amount,
        date: new Date(updatedData.date),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update the Expense");
  }
};

export const deleteExpense = async (id) => {
  try {
    return await prisma.expense.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the Expense");
    // throw error;
  }
};
