import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import { toast } from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
    useUserAuth();
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    })

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

            if (response.data) {
                console.log("Income data fetched:", response.data);
                // Extract the incomes array from the response
                const incomes = response.data.incomes || [];
                setIncomeData(incomes);
            }
        } catch (error) {
            console.error("Error fetching income data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddIncome = async (income) => {
        const { source, amount, date, icon, type = "income" } = income;

        if (!source.trim()) {
            toast.error("Income source is required.");
            return;
        }

        if (!amount || Number(amount) <= 0 || isNaN(amount)) {
            toast.error("Income amount should be a valid number greater than 0.");
            return;
        }

        if (!date) {
            toast.error("Income date is required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount: Number(amount),
                date,
                icon
            })

            setOpenAddIncomeModal(false);
            toast.success("Income added successfully.");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error adding income:",
                error.response?.data?.message || error.message
            )
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error(
                "Error deleting income:",
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
        fetchIncomeDetails();

        return () => { };
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id })
                        }}
                    />
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income detail?"
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Income
