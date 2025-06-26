import { useEffect, useState } from "react"
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "../../components/ui/table"

interface AttendanceRecord {
    userId: string
    dateOfWork: string
    totalHours: string | null
    overtime: string | null
}

const PAGE_LIMIT = 10;

export default function UserAttendance() {
    const [data, setData] = useState<AttendanceRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    // Fetch attendance data from backend
    const fetchAttendance = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/attendance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const backendData = await response.json();

            // Create dummy data
            const dummyData: AttendanceRecord[] = Array.from({ length: 25 }, (_, i) => ({
                userId: crypto.randomUUID(),
                dateOfWork: `2025-06-${(i % 30 + 1).toString().padStart(2, "0")}`,
                totalHours: `${(6 + (i % 4)).toFixed(1)}`,
                overtime: i % 3 === 0 ? `${(1 + i % 2).toFixed(1)}` : "0",
            }));

            // Combine backend data with dummy data
            const combinedData = [...backendData, ...dummyData];
            setData(combinedData);

        } catch (err) {
            console.error('Error fetching attendance:', err);
            // setError('Failed to fetch attendance from backend. Using dummy data only.');

            // Fallback to dummy data only
            const dummyData: AttendanceRecord[] = Array.from({ length: 25 }, (_, i) => ({
                userId: crypto.randomUUID(),
                dateOfWork: `2025-06-${(i % 30 + 1).toString().padStart(2, "0")}`,
                totalHours: `${(6 + (i % 4)).toFixed(1)}`,
                overtime: i % 3 === 0 ? `${(1 + i % 2).toFixed(1)}` : "0",
            }));
            setData(dummyData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const handleSearch = () => {
        // Trigger search functionality (in this case, it's already reactive)
        console.log('Search triggered for:', searchTerm);
    };

    const handleRefresh = () => {
        fetchAttendance();
    };

    const filteredData = data.filter((record) =>
        record.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.dateOfWork.includes(searchTerm)
    )

    const totalPages = Math.ceil(filteredData.length / PAGE_LIMIT)
    const paginatedData = filteredData.slice(
        (currentPage - 1) * PAGE_LIMIT,
        currentPage * PAGE_LIMIT
    )

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    if (loading) {
        return (
            <div className="p-6 text-white flex justify-center items-center">
                <div className="text-xl">Loading attendance...</div>
            </div>
        );
    }

    return (
        <div className="p-6 text-white">
            {/* Header and Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">User Attendance</h1>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    {/* Search Bar with Icon */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by user ID or date..."
                            className="w-full px-4 py-2 pr-10 bg-white text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-800 text-red-200 rounded-lg border border-red-600">
                    {error}
                </div>
            )}

            {/* Table using the new Table components */}
            <div className="rounded-lg border border-gray-700 bg-gray-900">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-gray-700">
                            <TableHead className="text-white font-medium">User ID</TableHead>
                            <TableHead className="text-white font-medium">Date of Work</TableHead>
                            <TableHead className="text-white font-medium">Total Hours</TableHead>
                            <TableHead className="text-white font-medium">Overtime</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((record) => (
                            <TableRow
                                key={`${record.userId}-${record.dateOfWork}`}
                                className="hover:bg-gray-700 border-gray-800"
                            >
                                <TableCell className="break-all text-white">{record.userId}</TableCell>
                                <TableCell className="text-white">{record.dateOfWork}</TableCell>
                                <TableCell className="text-white">{record.totalHours ?? "0"}</TableCell>
                                <TableCell className="text-white">{record.overtime ?? "0"}</TableCell>
                            </TableRow>
                        ))}
                        {paginatedData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                                    No attendance records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Previous
                </button>
                <span className="text-sm text-gray-300">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}