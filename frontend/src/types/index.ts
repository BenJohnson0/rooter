export interface Driver {
    id: number;
    name: string;
    start_location: string;
    end_location: string;
}

export interface Delivery {
    id: number;
    address: string;
    driver_id: number;
    status: string;
}

export interface RouteOptimizationRequest {
    start_location: string;
    end_location: string;
    deliveries: string[];
}

export interface RouteOptimizationResponse {
    message: string;
    route: {
        legs: Array<{
            distance: { text: string; value: number };
            duration: { text: string; value: number };
            steps: Array<{
                distance: { text: string; value: number };
                duration: { text: string; value: number };
                instructions: string;
                polyline: { points: string };
            }>;
        }>;
        overview_polyline: { points: string };
    };
} 