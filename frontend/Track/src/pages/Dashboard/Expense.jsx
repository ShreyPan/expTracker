import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    })

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

            console.log("response.data", response.data)

            if (response.data) {
                console.log("Expense data fetched:", response.data);
                const formatted = Array.isArray(response.data)
                    ? response.data : [response.data];
                setExpenseData(formatted);
            }
        } catch (error) {
            console.error("Error fetching expense data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon, type = "expense" } = expense;

        if (!category.trim()) {
            toast.error("Expense category is required.");
            return;
        }

        if (!amount || Number(amount) <= 0 || isNaN(amount)) {
            toast.error("Expense amount should be a valid number greater than 0.");
            return;
        }

        if (!date) {
            toast.error("Expense date is required.");
            return;
        }

        try {

            console.log("📦 Sending to backend:", {
                category,
                amount,
                date,
                icon,
                type: "expense"
            });

            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
                type: "expense"
            })

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully.");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error adding Expense:",
                error.response?.data?.message || error.message
            )
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error deleting expense:",
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
        fetchExpenseDetails();

        return () => { };
    }, []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id })
                        }}
                    />
                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense detail?"
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>

            </div>
        </DashboardLayout>
    )
}

export default Expense
