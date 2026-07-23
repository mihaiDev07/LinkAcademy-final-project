type EmployerProps = {
  image: string;
  name: string;
  job: string;
  description: string;
};

const Employer = ({ image, name, job, description }: EmployerProps) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow border-0">
        <div className="card-body d-flex gap-3">
          <img
            src={image}
            width="80"
            height="80"
            className="rounded-circle object-fit-cover"
            alt="Team member"
          />

          <div>
            <h5 className="mb-1">{name}</h5>
            <p className="text-muted mb-2">{job}</p>
            <p className="mb-0 text-muted">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employer;
